import { Construct, RemovalPolicy } from "@aws-cdk/core";
import { Bucket, BucketEncryption } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";

export class WebResources extends Construct {
  constructor(parent: Construct, name: string) {
    super(parent, name);

    const websiteBucket = new Bucket(this, "WebBucket", {
      versioned: false,
      encryption: BucketEncryption.S3_MANAGED,
      websiteIndexDocument: "index.html",
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY
    });

    new BucketDeployment(this, "DeployWebsite", {
      sources: [Source.asset("./build")],
      destinationBucket: websiteBucket
    });
  }
}
