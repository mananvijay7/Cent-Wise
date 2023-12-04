import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import AuthApi from 'splitwise-node';
import * as oauthDetails from '../oauthDetails.json';



const initialize = (app: Express) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // TODO: MongoDB connection
  let userOAuthToken: string, userOAuthTokenSecret: string;
  var authApi = new AuthApi(oauthDetails[0].consumerKey, oauthDetails[0].consumerSecret);

  
  app.get('/centwise/authorize', (req: Request, res: Response) => {
      
    authApi.getOAuthRequestToken()
      .then(({ token, secret }: { token: string, secret: string }) => {
        // Store these tokens in a secure way (e.g., in a session or a database)
        userOAuthToken = token;
        userOAuthTokenSecret = secret;
        
        const userAuthUrl = authApi.getUserAuthorisationUrl(token);
        res.json({ authorizationUrl: userAuthUrl });
      })
      .catch((error: Error) => {
        console.error('Error getting authorization URL:', error.message);
        res.status(500).send('Internal Server Error');
      });
  });

  
  app.get('/centwise/callback', (req: Request, res: Response) => {
    const { oauth_token, oauth_verifier } = req.query;

    authApi.getOAuthAccessToken(
      userOAuthToken,
      userOAuthTokenSecret,
      oauth_verifier
    )
    .then(({ oAuthAccessToken: accessToken, oAuthAccessTokenSecret: accessTokenSecret }: { oAuthAccessToken: string, oAuthAccessTokenSecret: string }) => {
      console.log('Access Token:', accessToken);
      console.log('Access Token Secret:', accessTokenSecret);
        // Now you have the access token and access token secret
        const splitwiseApi = authApi.getSplitwiseApi(accessToken, accessTokenSecret);
        //console.log("accessToken " + accessToken + " accessTokenSecret " + accessTokenSecret);
        splitwiseApi.getCurrentUser().then(console.log);
        //res.send('Authorization successful!');
        res.redirect('/');
      })
      .catch((error: Error) => {
        console.error('Error getting access token:', error.message);
        res.status(500).send('Internal Server Error');
      });
  });
};

export default initialize;