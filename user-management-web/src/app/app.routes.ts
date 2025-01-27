import {Routes} from '@angular/router';
import {UserDetailComponent} from './entities/user/detail/user-detail.component';
import {UserComponent} from './entities/user/list/user.component';
import {UserUpdateComponent} from './entities/user/update/user-update.component';
import {ProfileComponent} from './entities/profile/list/profile.component';
import {ProfileUpdateComponent} from './entities/profile/update/profile-update.component';
import {ChangePasswordComponent} from './entities/user/update/change-password.component';
import {HomeComponent} from './home/home.component';
import {AuthorizedComponent} from './authorized/authorized.component';
import {LogoutComponent} from './logout/logout.component';
import {MyuserDetailComponent} from './entities/myuser/detail/myuser-detail.component';
import {MyuserUpdateComponent} from './entities/myuser/update/myuser-update.component';
import {MyuserChangePasswordComponent} from './entities/myuser/update/myuser-change-password.component';
import {AuthGuard} from './guards/auth.guard';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'authorized', component: AuthorizedComponent },
  {
    path: 'myuser',
    component: MyuserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'myuser/edit',
    component: MyuserUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'myuser/password',
    component: MyuserChangePasswordComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER'] },
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'users/new',
    component: UserUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'users/:id/edit',
    component: UserUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'users/:id/view',
    component: UserDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
  },
  {
    path: 'users/:id/password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'profiles',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'profiles/new',
    component: ProfileUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {
    path: 'profiles/:id/edit',
    component: ProfileUpdateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
