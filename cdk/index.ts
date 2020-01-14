import { Stack, App, StackProps } from "@aws-cdk/core";
import { WebResources } from "./WebResources";

export class ServiceStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    new WebResources(this, "Website");
  }
}

const app = new App();

new ServiceStack(app, "WebStack");

app.synth();
