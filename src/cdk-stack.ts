import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as iam from 'aws-cdk-lib/aws-iam';
import {Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class StaticSite extends Construct {
  constructor(parent: Stack, name: string) {
    super(parent, name);

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, `${name}-OAI`)

    const siteBucket = new s3.Bucket(this,`${name}Bucket`,{
      bucketName:`${name}-bucket`,
      websiteIndexDocument:"index.html",
      publicReadAccess:false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL

    })
    siteBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions:["S3:GetObject"],
      resources:[siteBucket.arnForObjects("*")],
      principals:[new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
    }))

  const customErrorResponseProperty: cloudfront.CfnDistribution.CustomErrorResponseProperty = {
    errorCode: 403,
    errorCachingMinTtl: 123,
    responseCode: 200,
    responsePagePath: '/index.html',
  };

    //CloudFront
    const distribution = new cloudfront.CloudFrontWebDistribution(this, `${name}-distribution`,{
      originConfigs:[{
        s3OriginSource:{
          s3BucketSource:siteBucket,
          originAccessIdentity:cloudfrontOAI
        },
        behaviors:[{
          isDefaultBehavior:true
        }]
      }],
      errorConfigurations:[customErrorResponseProperty],
    })


    new s3deploy.BucketDeployment(this,`${name}-Bucket-Deployment`,{
      sources:[s3deploy.Source.asset("./build")],
      destinationBucket:siteBucket,
      distribution,
      distributionPaths:["/*"]
    })
  }
}