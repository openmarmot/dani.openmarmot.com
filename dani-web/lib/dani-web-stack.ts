import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BlockPublicAccess } from 'aws-cdk-lib/aws-s3';
import { CloudFrontWebDistribution, OriginAccessIdentity, ViewerCertificate, SourceConfiguration } from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

export class DaniWebStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 bucket with restricted public access
    const bucket = new Bucket(this, 'MyWebsiteBucket', {
      websiteIndexDocument: 'index.html',
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY // Be cautious with this in production
    });

    // Create an Origin Access Identity
    const oai = new OriginAccessIdentity(this, 'OAI', {
      comment: "OAI for MyWebsiteBucket"
    });

    // Grant OAI permission to read from the bucket
    bucket.grantRead(oai);

    // Import an existing certificate
    const certificateArn = 'arn:aws:acm:us-east-1:123456789012:certificate/your-cert-id';
    const certificate = Certificate.fromCertificateArn(this, 'SiteCertificate', certificateArn);

    // Define the S3 origin source
    const s3OriginSource: SourceConfiguration = {
      s3OriginSource: {
        s3BucketSource: bucket,
        originAccessIdentity: oai
      },
      behaviors: [{ isDefaultBehavior: true }],
    };

    // Create a CloudFront distribution
    const distribution = new CloudFrontWebDistribution(this, 'MySiteDistribution', {
      originConfigs: [s3OriginSource],
      viewerCertificate: ViewerCertificate.fromAcmCertificate(certificate, {
        aliases: ['www.yourdomain.com']
      })
    });

    // Outputs for easy access
    new cdk.CfnOutput(this, 'DistributionId', { value: distribution.distributionId });
    new cdk.CfnOutput(this, 'BucketName', { value: bucket.bucketName });
  }
}
