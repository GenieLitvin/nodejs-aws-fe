#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StaticSite } from './cdk-stack';

class MyStaticSiteStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string) {
    super(parent, name);

    new StaticSite(this, 'node-aws-shop-fe-web');
  }
}

const app = new cdk.App();

new MyStaticSiteStack(app, 'NodeAwsShopFeStack1');

app.synth();