import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myConfig from '../../config';
import { Router } from '@angular/router';
const DEFAULT_ORIGINAL_URI = window.location.origin;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signIn: any;

  authenticated: boolean = false;
  constructor(private router:Router,public authStateService: OktaAuthStateService, @Inject(OKTA_AUTH) public oktaAuth:OktaAuth) {
    this.signIn = new OktaSignIn({
      baseUrl: myConfig.oidc.issuer.split('/oauth2')[0],
      clientId: myConfig.oidc.clientId,
      redirectUri: myConfig.oidc.redirectUri,
      logo: 'favicon.ico',
      i18n:{
        en:{
          'primaryauth.title':'Sign in to Chat App'
        }
      },
     authClient: oktaAuth
    })
  }

  ngOnInit(): void {
    const originalUri = this.oktaAuth.getOriginalUri();
    if(!originalUri || originalUri == DEFAULT_ORIGINAL_URI)
    {
      this.oktaAuth.setOriginalUri('/');
    }

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: myConfig.oidc.scopes
    }).then((tokens: Tokens) => {
      // Remove the widget
      this.signIn.remove();
      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }

}
