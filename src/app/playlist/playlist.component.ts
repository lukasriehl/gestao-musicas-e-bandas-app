import { MusicPromiseService } from './../services/music-promise.service';
import { Playlist } from './../model/playlist';
import { Music } from '../model/music';
import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { PlaylistPromiseService } from '../services/playlist-promise.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import { Shared } from '../util/shared';
import { WebStorageUtil } from '../util/web-storage-util';
import { Constants } from '../util/constants';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  playlist: Playlist;

  sessionUserId!: string;

  isUpdate: boolean;

  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  public columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      headerCheckboxSelection: true,
      checkboxSelection: (
        params: CheckboxSelectionCallbackParams<Music>
      ) => {
        return !!params.data && this.isMusicAlreadySelected(params.data.name);
      },
      showDisabledCheckboxes: true,
    },
    { field: 'cdName',
      headerName: 'Nome do CD'},
    { field: 'band.name',
      headerName: 'Banda'},
    { field: 'link',
      headerName: 'Link',
      minWidth: 600 },
  ];
  public defaultColDef: ColDef = {
    resizable: true
  };

  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowData!: Music[];
  public preSelectedMusics!: Music[];

  constructor(private route: ActivatedRoute, private playlistPromiseService: PlaylistPromiseService,
    private musicPromiseService: MusicPromiseService, @Inject(LOCALE_ID) private locale: string) {
    this.playlist = new Playlist('');
    this.preSelectedMusics = [];
    this.isUpdate = false;
  }

  ngOnInit(): void {
    Shared.initializeWebStorage();

    this.sessionUserId = WebStorageUtil.get(Constants.SESSION_USER_ID);

    const routeParams = this.route.snapshot.paramMap;
    const playlistId = Number(routeParams.get('playlistId'));

    this.isUpdate = playlistId !== undefined && playlistId > 0;

    console.log("Id da playlist para altera????o: " + playlistId);

    if(this.isUpdate){
      this.playlistPromiseService.getById(playlistId)
      .then((p: Playlist) => {
        this.playlist = Playlist.clone(p);
        this.preSelectedMusics = p.musics;
        console.log("Quantidade de m??sicas existentes na playlist: " + this.preSelectedMusics.length);
      });
    }
  }

  onFirstDataRendered(params: FirstDataRenderedEvent<Music>) {
    params.api.forEachNode((node) =>
      node.setSelected(!!node.data && this.isMusicAlreadySelected(node.data.name))
    );
  }

  onGridReady(params: GridReadyEvent<Music>) {
    this.loadMusics();
  }

  onSubmit() {
    this.playlist.musics = this.getSelectedMusics();
    this.playlist.userId = this.sessionUserId;

    if(this.playlist.musics.length == 0){
      window.alert('Selecione ao menos 1 m??sica para a playlist!');

      return;
    }

    this.playlistPromiseService.findIdByName(this.playlist.name)
    .then((i: number) => {
      if(i >= 0){
        if(!this.isUpdate){
          this.playlist.id = i;
        }

        this.playlistPromiseService.update(this.playlist)
        .then(() => {
          this.message = 'Altera????o realizada com sucesso!';
        })
      } else{
        this.playlistPromiseService.save(this.playlist)
        .then(() => {
          this.message = 'Cadastro realizado com sucesso!';
        })
      }

      this.isSuccess = true;
    })
    .catch((e) => {
      this.isSuccess = false;
      this.message = 'Falha ao cadastrar/alterar playlist!';
    })
    .finally(() => {
      this.isShowMessage = true;
    })
    .then((() => {
      setTimeout(() => {
        this.isShowMessage = false;
        this.form.reset();
        this.playlist = new Playlist('');
      }, 700)
    }))
    .then(() => {
      setTimeout(() => {
        this.loadMusics();
      }, 700);
    })
  }

  loadMusics(){
    this.musicPromiseService.listAllWithBandExpanded()
    .then((m: Music[]) => {
      this.rowData = m;
    });
  }

  isMusicAlreadySelected(name: string): boolean{
    if(!!this.preSelectedMusics && this.preSelectedMusics.length > 0){
      for (let i = 0; i < this.preSelectedMusics.length; i++){
        if(this.preSelectedMusics[i].name === name){
          return true;
        }
      }
  }

    return false;
  }

  getSelectedMusics(): Music[] {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    return selectedData;
  }

}
