import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../model/user';
import { Playlist } from './../model/playlist';


@Component({
  selector: 'app-playlist-panel',
  templateUrl: './playlist-panel.component.html',
  styleUrls: ['./playlist-panel.component.css']
})
export class PlaylistPanelComponent implements OnInit {
  @Input() value: Playlist = new Playlist('');
  @Output() playlistWarnEvent = new EventEmitter<boolean>();
  public user?: User;
  public name?: string;


  constructor() {
    this.name = this.value?.name;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if(this.value.musics.length === 0){
      setTimeout(() => {
        this.playlistWarnEvent.emit(true);
      }, 3000);
    }
  }

}
