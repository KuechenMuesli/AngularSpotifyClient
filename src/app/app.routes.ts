import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {CallbackComponent} from "./components/callback/callback.component";
import {PlaylistDetailsComponent} from "./components/playlist-details/playlist-details.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'playlist/:playlistId', component: PlaylistDetailsComponent}
];
