import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from '../model/user';
import { PlaylistDTO } from './../model/playlist';
import { MusicPromiseService } from '../services/music-promise.service';
import { Music } from '../model/music';


@Component({
  selector: 'app-playlist-panel',
  templateUrl: './playlist-panel.component.html',
  styleUrls: ['./playlist-panel.component.css']
})
export class PlaylistPanelComponent implements OnInit {
  @Input() value: PlaylistDTO[] = [];
  @Output() playlistWarnEvent = new EventEmitter<boolean>();
  public user?: User;


  constructor(private musicPromiseService: MusicPromiseService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log("Quantidade de playlists: " + this.value.length);
    if(!this.value || this.value.length === 0){
      setTimeout(() => {
        this.playlistWarnEvent.emit(true);
      }, 3000);
    }else{
      for(let i = 0; i < this.value.length; i++){
        let p = this.value[i];

        if(p.musics.length > 0){
          for(let j = 0; j < p.musics.length; j++){
            let m = p.musics[j];

            this.musicPromiseService.getById(Number(m.id)).then((music: Music) => {
              m.name = music.name;
              m.link = music.link;
            });
          }
        }
      }
    }
  }

}
