import * as fs from "fs-extra";
import * as AWS from "aws-sdk";

const awsConfigPath = "./src/config/aws.config.js";

const awsConfigure = async () => {
  const cloudformation = new AWS.CloudFormation();
  const stack = await cloudformation
    .describeStacks({
      StackName: "LambdaLego1ApiStack"
    })
    .promise();

  console.log(stack);

  if (stack.Stacks.length !== 1) {
    throw new Error(`Found ${stack.Stacks.length} for LambdaLego1ApiStack.`);
  }

  const outputs = stack.Stacks[0].Outputs;
  outputs.forEach(o => console.log(JSON.stringify(o)));

  const apiUrl = outputs.find(o => o.OutputKey.startsWith("APIApiUrl"));

  if (!apiUrl) {
    throw new Error(`No API Url defined for LambdaLego1ApiStack.`);
  }

  fs.writeFileSync(
    awsConfigPath,
    `export const API_URL=${apiUrl.OutputValue}`,
    "utf8"
  );
};

awsConfigure();
