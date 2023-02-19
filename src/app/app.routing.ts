import { Routes, RouterModule } from '@angular/router';

import { FeedComponent } from './feed/components/feed';
import { LoginComponent } from '@authentication/components/login';
import { AuthGuard } from './shared/helpers';

const routes: Routes = [
    { path: '', component: FeedComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);