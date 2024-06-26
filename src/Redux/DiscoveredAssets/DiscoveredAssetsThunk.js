import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "Views/AppViews/Config";
import { postLoginService } from "Services";

export const getDiscoveredAssets = createAsyncThunk(
  "discoveredAssets/getDiscoveredAssets",
  async (params) => {
    let { orgId, pageNo, pageSize, filterFlag } = params;

    let url = config.GET_DISCOVERED_ASSETS.replace("#org-id#", orgId)
      .replace("#page-no#", pageNo)
      .replace("#page-size#", pageSize)
      .replace("#filter-flag#", filterFlag);

    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getAwsRegions = createAsyncThunk(
  "discoveredAssets/getAwsRegions",
  async (params) => {
    let url = config.GET_AWS_REGIONS;
    try {
      const response = await postLoginService.get(url);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

let datas = {
  Events: [
    {
      AccessKeyId: "ASIAZSLS3RLMQZPBHLML",
      CloudTrailEvent:
        '{"eventVersion":"1.08","userIdentity":{"type":"AssumedRole","principalId":"AROAZSLS3RLM6KWF7E6B4:Umar.Quadri@synectiks.com","arn":"arn:aws:sts::657907747545:assumed-role/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a/Umar.Quadri@synectiks.com","accountId":"657907747545","accessKeyId":"ASIAZSLS3RLMQZPBHLML","sessionContext":{"sessionIssuer":{"type":"Role","principalId":"AROAZSLS3RLM6KWF7E6B4","arn":"arn:aws:iam::657907747545:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a","accountId":"657907747545","userName":"AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a"},"webIdFederationData":{},"attributes":{"creationDate":"2024-04-17T06:43:19Z","mfaAuthenticated":"false"}}},"eventTime":"2024-04-17T10:40:58Z","eventSource":"apigateway.amazonaws.com","eventName":"CreateStage","awsRegion":"us-east-1","sourceIPAddress":"14.140.185.67","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","requestParameters":{"restApiId":"67ge356u6d","createStageInput":{"cacheClusterSize":"0.5","deploymentId":"6gejpe","description":"","cacheClusterEnabled":false,"tracingEnabled":false,"stageName":"new"},"template":false},"responseElements":{"stageUpdate":{"restApiId":"67ge356u6d","stageName":"new","template":false},"stageName":"new","createdDate":"Apr 17, 2024 10:40:58 AM","cacheClusterSize":"0.5","cacheClusterStatus":"NOT_AVAILABLE","tracingEnabled":false,"methodSettings":{},"deploymentId":"6gejpe","cacheClusterEnabled":false,"lastUpdatedDate":"Apr 17, 2024 10:40:58 AM","stageFlushAuthorizerCache":{"stageName":"new","restApiId":"67ge356u6d","template":false},"stageDelete":{"restApiId":"67ge356u6d","stageName":"new","template":false},"self":{"restApiId":"67ge356u6d","stageName":"new","template":false}},"requestID":"ebfee9df-61d6-45a0-aaa1-3b5d3b25e34b","eventID":"c3a30cc3-a839-4e9c-80fb-d0f5220ca226","readOnly":false,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"657907747545","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.3","cipherSuite":"TLS_AES_128_GCM_SHA256","clientProvidedHostHeader":"apigateway.us-east-1.amazonaws.com"},"sessionCredentialFromConsole":"true"}',
      EventId: "c3a30cc3-a839-4e9c-80fb-d0f5220ca226",
      EventName: "CreateStage",
      EventSource: "apigateway.amazonaws.com",
      EventTime: "2024-04-17T10:40:58Z",
      ReadOnly: "false",
      Resources: [
        { ResourceName: "new", ResourceType: "AWS::ApiGateway::Stage" },
        {
          ResourceName: "67ge356u6d",
          ResourceType: "AWS::ApiGateway::RestApi",
        },
      ],
      Username: "Umar.Quadri@synectiks.com",
    },
    {
      AccessKeyId: "ASIAZSLS3RLMQZPBHLML",
      CloudTrailEvent:
        '{"eventVersion":"1.08","userIdentity":{"type":"AssumedRole","principalId":"AROAZSLS3RLM6KWF7E6B4:Umar.Quadri@synectiks.com","arn":"arn:aws:sts::657907747545:assumed-role/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a/Umar.Quadri@synectiks.com","accountId":"657907747545","accessKeyId":"ASIAZSLS3RLMQZPBHLML","sessionContext":{"sessionIssuer":{"type":"Role","principalId":"AROAZSLS3RLM6KWF7E6B4","arn":"arn:aws:iam::657907747545:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a","accountId":"657907747545","userName":"AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a"},"webIdFederationData":{},"attributes":{"creationDate":"2024-04-17T06:43:19Z","mfaAuthenticated":"false"}}},"eventTime":"2024-04-17T10:40:57Z","eventSource":"apigateway.amazonaws.com","eventName":"CreateDeployment","awsRegion":"us-east-1","sourceIPAddress":"14.140.185.67","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","requestParameters":{"restApiId":"67ge356u6d","createDeploymentInput":{"description":"","stageName":""},"template":false},"responseElements":{"id":"6gejpe","createdDate":"Apr 17, 2024 10:40:57 AM","deploymentUpdate":{"restApiId":"67ge356u6d","deploymentId":"6gejpe","template":false},"deploymentStages":{"deploymentId":"6gejpe","restApiId":"67ge356u6d","template":false,"templateSkipList":["position"]},"deploymentDelete":{"deploymentId":"6gejpe","restApiId":"67ge356u6d","template":false},"self":{"deploymentId":"6gejpe","restApiId":"67ge356u6d","template":false}},"requestID":"ae58ed21-bcad-45aa-8291-839cf4ef5d67","eventID":"ff797b29-8a94-4729-8d9e-4421b4a3f6e7","readOnly":false,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"657907747545","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.3","cipherSuite":"TLS_AES_128_GCM_SHA256","clientProvidedHostHeader":"apigateway.us-east-1.amazonaws.com"},"sessionCredentialFromConsole":"true"}',
      EventId: "ff797b29-8a94-4729-8d9e-4421b4a3f6e7",
      EventName: "CreateDeployment",
      EventSource: "apigateway.amazonaws.com",
      EventTime: "2024-04-17T10:40:57Z",
      ReadOnly: "false",
      Resources: [
        {
          ResourceName: "6gejpe",
          ResourceType: "AWS::ApiGateway::Deployment",
        },
        {
          ResourceName: "67ge356u6d",
          ResourceType: "AWS::ApiGateway::RestApi",
        },
      ],
      Username: "Umar.Quadri@synectiks.com",
    },
    {
      AccessKeyId: "ASIAZSLS3RLMQZPBHLML",
      CloudTrailEvent:
        '{"eventVersion":"1.08","userIdentity":{"type":"AssumedRole","principalId":"AROAZSLS3RLM6KWF7E6B4:Umar.Quadri@synectiks.com","arn":"arn:aws:sts::657907747545:assumed-role/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a/Umar.Quadri@synectiks.com","accountId":"657907747545","accessKeyId":"ASIAZSLS3RLMQZPBHLML","sessionContext":{"sessionIssuer":{"type":"Role","principalId":"AROAZSLS3RLM6KWF7E6B4","arn":"arn:aws:iam::657907747545:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a","accountId":"657907747545","userName":"AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a"},"webIdFederationData":{},"attributes":{"creationDate":"2024-04-17T06:43:19Z","mfaAuthenticated":"false"}}},"eventTime":"2024-04-17T10:39:31Z","eventSource":"apigateway.amazonaws.com","eventName":"CreateDeployment","awsRegion":"us-east-1","sourceIPAddress":"14.140.185.67","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","requestParameters":{"restApiId":"67ge356u6d","createDeploymentInput":{"description":"","stageName":""},"template":false},"responseElements":{"id":"3f9ic5","createdDate":"Apr 17, 2024 10:39:31 AM","deploymentUpdate":{"restApiId":"67ge356u6d","deploymentId":"3f9ic5","template":false},"deploymentStages":{"deploymentId":"3f9ic5","restApiId":"67ge356u6d","template":false,"templateSkipList":["position"]},"deploymentDelete":{"deploymentId":"3f9ic5","restApiId":"67ge356u6d","template":false},"self":{"deploymentId":"3f9ic5","restApiId":"67ge356u6d","template":false}},"requestID":"f39167ee-409b-4e8c-92c3-3b158efe7268","eventID":"d18426d2-2830-4854-83a3-f9458b9ed2b4","readOnly":false,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"657907747545","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.3","cipherSuite":"TLS_AES_128_GCM_SHA256","clientProvidedHostHeader":"apigateway.us-east-1.amazonaws.com"},"sessionCredentialFromConsole":"true"}',
      EventId: "d18426d2-2830-4854-83a3-f9458b9ed2b4",
      EventName: "CreateDeployment",
      EventSource: "apigateway.amazonaws.com",
      EventTime: "2024-04-17T10:39:31Z",
      ReadOnly: "false",
      Resources: [
        {
          ResourceName: "3f9ic5",
          ResourceType: "AWS::ApiGateway::Deployment",
        },
        {
          ResourceName: "67ge356u6d",
          ResourceType: "AWS::ApiGateway::RestApi",
        },
      ],
      Username: "Umar.Quadri@synectiks.com",
    },
    {
      AccessKeyId: "ASIAZSLS3RLMQYDAENWS",
      CloudTrailEvent:
        '{"eventVersion":"1.08","userIdentity":{"type":"AssumedRole","principalId":"AROAZSLS3RLM6KWF7E6B4:Umar.Quadri@synectiks.com","arn":"arn:aws:sts::657907747545:assumed-role/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a/Umar.Quadri@synectiks.com","accountId":"657907747545","accessKeyId":"ASIAZSLS3RLMQYDAENWS","sessionContext":{"sessionIssuer":{"type":"Role","principalId":"AROAZSLS3RLM6KWF7E6B4","arn":"arn:aws:iam::657907747545:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a","accountId":"657907747545","userName":"AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a"},"webIdFederationData":{},"attributes":{"creationDate":"2024-04-17T06:43:19Z","mfaAuthenticated":"false"}}},"eventTime":"2024-04-17T09:42:04Z","eventSource":"apigateway.amazonaws.com","eventName":"CreateDeployment","awsRegion":"us-east-1","sourceIPAddress":"14.140.185.67","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","requestParameters":{"restApiId":"67ge356u6d","createDeploymentInput":{"description":"","stageName":"test"},"template":false},"responseElements":{"id":"udvyux","createdDate":"Apr 17, 2024 9:42:04 AM","deploymentUpdate":{"restApiId":"67ge356u6d","deploymentId":"udvyux","template":false},"deploymentStages":{"deploymentId":"udvyux","restApiId":"67ge356u6d","template":false,"templateSkipList":["position"]},"deploymentDelete":{"deploymentId":"udvyux","restApiId":"67ge356u6d","template":false},"self":{"deploymentId":"udvyux","restApiId":"67ge356u6d","template":false}},"requestID":"98f239a9-7b15-4698-9e6c-2a361d197cd8","eventID":"0eaeb784-b095-4d4d-9f84-65a01192bd01","readOnly":false,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"657907747545","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.3","cipherSuite":"TLS_AES_128_GCM_SHA256","clientProvidedHostHeader":"apigateway.us-east-1.amazonaws.com"},"sessionCredentialFromConsole":"true"}',
      EventId: "0eaeb784-b095-4d4d-9f84-65a01192bd01",
      EventName: "CreateDeployment",
      EventSource: "apigateway.amazonaws.com",
      EventTime: "2024-04-17T09:42:04Z",
      ReadOnly: "false",
      Resources: [
        { ResourceName: "test", ResourceType: "AWS::ApiGateway::Stage" },
        {
          ResourceName: "udvyux",
          ResourceType: "AWS::ApiGateway::Deployment",
        },
        {
          ResourceName: "67ge356u6d",
          ResourceType: "AWS::ApiGateway::RestApi",
        },
      ],
      Username: "Umar.Quadri@synectiks.com",
    },
    {
      AccessKeyId: "ASIAZSLS3RLMZRF3D2WG",
      CloudTrailEvent:
        '{"eventVersion":"1.08","userIdentity":{"type":"AssumedRole","principalId":"AROAZSLS3RLM6KWF7E6B4:Umar.Quadri@synectiks.com","arn":"arn:aws:sts::657907747545:assumed-role/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a/Umar.Quadri@synectiks.com","accountId":"657907747545","accessKeyId":"ASIAZSLS3RLMZRF3D2WG","sessionContext":{"sessionIssuer":{"type":"Role","principalId":"AROAZSLS3RLM6KWF7E6B4","arn":"arn:aws:iam::657907747545:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a","accountId":"657907747545","userName":"AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a"},"webIdFederationData":{},"attributes":{"creationDate":"2024-04-17T06:43:19Z","mfaAuthenticated":"false"}}},"eventTime":"2024-04-17T07:27:54Z","eventSource":"apigateway.amazonaws.com","eventName":"CreateStage","awsRegion":"us-east-1","sourceIPAddress":"14.140.185.67","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","requestParameters":{"restApiId":"67ge356u6d","createStageInput":{"cacheClusterSize":"0.5","deploymentId":"cz3mkw","description":"","cacheClusterEnabled":false,"tracingEnabled":false,"stageName":"test"},"template":false},"responseElements":{"stageUpdate":{"restApiId":"67ge356u6d","stageName":"test","template":false},"stageName":"test","createdDate":"Apr 17, 2024 7:27:54 AM","cacheClusterSize":"0.5","cacheClusterStatus":"NOT_AVAILABLE","tracingEnabled":false,"methodSettings":{},"deploymentId":"cz3mkw","cacheClusterEnabled":false,"lastUpdatedDate":"Apr 17, 2024 7:27:54 AM","stageFlushAuthorizerCache":{"stageName":"test","restApiId":"67ge356u6d","template":false},"stageDelete":{"restApiId":"67ge356u6d","stageName":"test","template":false},"self":{"restApiId":"67ge356u6d","stageName":"test","template":false}},"requestID":"8ff6785c-ee9d-4b1a-8743-5bdf5e986b54","eventID":"12a3281a-1973-4c5b-bf36-e817e917a107","readOnly":false,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"657907747545","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.3","cipherSuite":"TLS_AES_128_GCM_SHA256","clientProvidedHostHeader":"apigateway.us-east-1.amazonaws.com"},"sessionCredentialFromConsole":"true"}',
      EventId: "12a3281a-1973-4c5b-bf36-e817e917a107",
      EventName: "CreateStage",
      EventSource: "apigateway.amazonaws.com",
      EventTime: "2024-04-17T07:27:54Z",
      ReadOnly: "false",
      Resources: [
        { ResourceName: "test", ResourceType: "AWS::ApiGateway::Stage" },
        {
          ResourceName: "67ge356u6d",
          ResourceType: "AWS::ApiGateway::RestApi",
        },
      ],
      Username: "Umar.Quadri@synectiks.com",
    },
    {
      AccessKeyId: "ASIAZSLS3RLMZRF3D2WG",
      CloudTrailEvent:
        '{"eventVersion":"1.08","userIdentity":{"type":"AssumedRole","principalId":"AROAZSLS3RLM6KWF7E6B4:Umar.Quadri@synectiks.com","arn":"arn:aws:sts::657907747545:assumed-role/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a/Umar.Quadri@synectiks.com","accountId":"657907747545","accessKeyId":"ASIAZSLS3RLMZRF3D2WG","sessionContext":{"sessionIssuer":{"type":"Role","principalId":"AROAZSLS3RLM6KWF7E6B4","arn":"arn:aws:iam::657907747545:role/aws-reserved/sso.amazonaws.com/AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a","accountId":"657907747545","userName":"AWSReservedSSO_Synectiks-dev-API-developers_4972de7308bc000a"},"webIdFederationData":{},"attributes":{"creationDate":"2024-04-17T06:43:19Z","mfaAuthenticated":"false"}}},"eventTime":"2024-04-17T07:27:53Z","eventSource":"apigateway.amazonaws.com","eventName":"CreateDeployment","awsRegion":"us-east-1","sourceIPAddress":"14.140.185.67","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36","requestParameters":{"restApiId":"67ge356u6d","createDeploymentInput":{"description":"","stageName":""},"template":false},"responseElements":{"id":"cz3mkw","createdDate":"Apr 17, 2024 7:27:53 AM","deploymentUpdate":{"restApiId":"67ge356u6d","deploymentId":"cz3mkw","template":false},"deploymentStages":{"deploymentId":"cz3mkw","restApiId":"67ge356u6d","template":false,"templateSkipList":["position"]},"deploymentDelete":{"deploymentId":"cz3mkw","restApiId":"67ge356u6d","template":false},"self":{"deploymentId":"cz3mkw","restApiId":"67ge356u6d","template":false}},"requestID":"bb4dbef5-f146-459b-966b-6dd9fba7c2dd","eventID":"b7bd7bd6-afd9-4c0d-9f4b-a68a58a6b08d","readOnly":false,"eventType":"AwsApiCall","managementEvent":true,"recipientAccountId":"657907747545","eventCategory":"Management","tlsDetails":{"tlsVersion":"TLSv1.3","cipherSuite":"TLS_AES_128_GCM_SHA256","clientProvidedHostHeader":"apigateway.us-east-1.amazonaws.com"},"sessionCredentialFromConsole":"true"}',
      EventId: "b7bd7bd6-afd9-4c0d-9f4b-a68a58a6b08d",
      EventName: "CreateDeployment",
      EventSource: "apigateway.amazonaws.com",
      EventTime: "2024-04-17T07:27:53Z",
      ReadOnly: "false",
      Resources: [
        {
          ResourceName: "cz3mkw",
          ResourceType: "AWS::ApiGateway::Deployment",
        },
        {
          ResourceName: "67ge356u6d",
          ResourceType: "AWS::ApiGateway::RestApi",
        },
      ],
      Username: "Umar.Quadri@synectiks.com",
    },
  ],
  NextToken: null,
};
export const getEventsHistory = createAsyncThunk(
  "discoveredAssets/getEventsHistory",
  async (params) => {
    let { instanceId, landingZoneId } = params;

    let url = config.GET_EVENTS_HISTORY.replace(
      "#instance-id#",
      instanceId
    ).replace("#landing-zone-id#", landingZoneId);

    try {
      const response = await postLoginService.get(url);
      // return response;
      return datas;
    } catch (error) {
      // throw new Error(error);
      return datas;
    }
  }
);
