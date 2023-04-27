# [C001:Common Login API] 
`PUT` /{costmer}/login

# 1. Overview
ログイン処理を行う

# 2. Flow Diagram  
ＵＭＬの確認をします。


```uml
@startuml
actor Foo1 #red
boundary Foo2 #green
control Foo3
entity Foo4
database Foo5
collections Foo6
Foo1 -> Foo2 : To boundary
Foo1 -> Foo3 : To control
Foo1 -> Foo4 : To entity
Foo1 -> Foo5 : To database
Foo1 -> Foo6 : To collections

alt Key is "aaa"
	Foo1 -> Foo3 : Call:API_1
	loop while cnt > 1
		Foo1 -> Foo2 : Add queue N20
		Foo1 -> Foo1 : cnt = cnt  -1
	end
else otherwise
	Foo2 -> Foo3 : Call:API_2
end alt

@enduml
```  

```uml
@startuml
!define AWSPuml https://raw.githubusercontent.com/awslabs/aws-icons-for-plantuml/v14.0/dist
!include AWSPuml/AWSCommon.puml
!include AWSPuml/General/Users.puml
!include AWSPuml/Groups/AWSCloud.puml
!include AWSPuml/Groups/Generic.puml
!include AWSPuml/Groups/GenericAlt.puml
!include AWSPuml/NetworkingContentDelivery/CloudFront.puml
!include AWSPuml/Database/DynamoDB.puml
!include AWSPuml/SecurityIdentityCompliance/Cognito.puml
!include AWSPuml/Compute/LambdaLambdaFunction.puml
!include AWSPuml/Storage/SimpleStorageService.puml
!include AWSPuml/ApplicationIntegration/APIGateway.puml
!include AWSPuml/ApplicationIntegration/AppSync.puml
!include AWSPuml/FrontEndWebMobile/Amplify.puml
!include AWSPuml/Analytics/Athena.puml
!include AWSPuml/CloudFinancialManagement/CostandUsageReport.puml
!include AWSPuml/DeveloperTools/ToolsandSDKs.puml
!include AWSPuml/ManagementGovernance/Config.puml
!include AWSPuml/Groups/VPC.puml
!include AWSPuml/Groups/PrivateSubnet.puml
!include AWSPuml/Database/Neptune.puml
!include AWSPuml/Analytics/OpenSearchService.puml
!include AWSPuml/Containers/ElasticContainerService.puml
!include AWSPuml/Containers/Fargate.puml
!include AWSPuml/Containers/ElasticContainerRegistry.puml
!include AWSPuml/DeveloperTools/CodePipeline.puml
!include AWSPuml/DeveloperTools/CodeBuild.puml
!include AWSPuml/Containers/ElasticContainerRegistryImage.puml
!include AWSPuml/AWSSimplified.puml

top to bottom direction
title AWSでのワークロード検出

skinparam shadowing false
hide stereotype
skinparam linetype ortho
skinparam rectangle {
    BackgroundColor AWS_BG_COLOR
    BorderColor transparent
}

!procedure $stepnum($number) 
<back:royalblue><color:white><b> $number </b></color></back>
!endprocedure

rectangle "$UsersIMG()\nユーザ" as users
AWSCloudGroup(cloud){
  rectangle "<font color=white>right" as right {
    GenericGroup(components4,コストコンポーネント){
      rectangle "$LambdaLambdaFunctionIMG()\nAWS Lambda\nCost関数" as lambda2
      rectangle "$AthenaIMG()\nAmazon Athena" as athena
      rectangle "$SimpleStorageServiceIMG()\nAmazon S3バケット\nCURバケット" as s33
      rectangle "$CostandUsageReportIMG()\nAWSのコストと使用状況\nレポート" as cost
      rectangle "$SimpleStorageServiceIMG()\nAmazon S3バケット\nAthenaResultsBucket" as s34
    }
    VPCGroup(vpc,VPC){
      PrivateSubnetGroup(subnet,プライベートサブネット){
        GenericGroup(components5,データコンポーネント) #Transparent {
          rectangle "$LambdaLambdaFunctionIMG()\nAWS Lambda\nGremlin関数" as lambda3 #Transparent
          rectangle "$NeptuneIMG()\nAmazon Neptune" as neptune #Transparent
          rectangle "$LambdaLambdaFunctionIMG()\nAWS Lambda\nSearch関数" as lambda4 #Transparent
          rectangle "$OpenSearchServiceIMG()\nAmazon OpenSearch Service\n(Amazon Elasticsearch Service\nの後継サービス)" as opensearch #Transparent
        }
        GenericGroup(components6,検出コンポーネント) #Transparent {
          rectangle "$ElasticContainerServiceIMG()\nAmazon Elastic\nContainer Service" as ecs #Transparent
          rectangle "$FargateIMG()\nAWS Fargate" as fargate #Transparent
          rectangle "$ElasticContainerRegistryIMG()\nAmazon Elastic\nContainer Registry" as ecr #Transparent
        }
      }
    }
    GenericGroup(components7,イメージデプロイコンポーネント) #Transparent {
      rectangle "$SimpleStorageServiceIMG()\nAmazon S3バケット\nDiscoveryBucket" as s35
      rectangle "$CodePipelineIMG()\nAWS CodePipeline" as codepipeline
      rectangle "$CodeBuildIMG()\nAWS CodeBuild" as codebuild
      rectangle "$ElasticContainerRegistryImageIMG()\nコンテナ\nイメージ" as container
    }
  }
  rectangle "<font color=white>left" as left {
    GenericGroup(components1,ウェブUIコンポーネント){
      rectangle "$DynamoDBIMG()\nAmazon DynamoDB\nSettingsテーブル" as dynamodb
      rectangle "$CognitoIMG()\nAmazon Cognito" as cognito
      rectangle "$SimpleStorageServiceIMG()\nAmazon S3バケット\nWebUIBucket" as s31
      rectangle "$LambdaLambdaFunctionIMG()\nAWS Lambda\nSettings関数" as lambda1
      rectangle "$CloudFrontIMG()\nAmazon CloudFront" as cloudfront
      GenericAltGroup(clgroup,クライアントAPI){
        rectangle "$APIGatewayIMG()\nAmazon API\nGateway" as apigateway1 #Transparent
        rectangle "$AppSyncIMG()\nAWS AppSync" as appsync #Transparent
      }
    }
    rectangle "<font color=white>left_down" as left_down {
      rectangle "<font color=white>develop" as components3 {
        rectangle "$APIGatewayIMG()\nAmazon API Gateway\nServiceGremlin API" as apigateway2
        rectangle "$ToolsandSDKsIMG()\nAWS SDK" as sdk
        rectangle "$ConfigIMG()\nAWS Config" as config
      }
      GenericGroup(components2,ストレージ管理コンポーネント){
        rectangle "$AmplifyIMG()\nAWS Amplify" as amplify
        rectangle "$SimpleStorageServiceIMG()\nAmazon S3バケット\nAmplifyStorageBucket" as s32
      }
    }
  }
}

'# オブジェクト同士の接続
vpc-[hidden]r-components7
components4-[hidden]d-vpc
components5-[hidden]d-components6

'# ユーザアクセス
cloudfront<-l-users: $stepnum("1")

'# ウェブUIコンポーネント
lambda1-l->dynamodb: $stepnum("6")
cloudfront-r->s31
dynamodb-[hidden]d-cognito
s31-u->cognito: $stepnum("2")
s31-r->clgroup
clgroup--u->lambda1
clgroup-u->cognito: $stepnum("5")
s31-d->components2
apigateway1-[#EFF0F3]r-appsync: $stepnum("4")
appsync-u->lambda2
appsync-r->lambda3

'# ストレージ管理コンポーネント
amplify<-r->s32: $stepnum("3")

'# API Gateway、SDK、Config
apigateway2-[hidden]d-sdk
sdk-[hidden]d-config
apigateway2-r->lambda4

'# コストコンポーネント
lambda2-r->athena: $stepnum("9")
athena-r->s33: $stepnum("10")
cost-l->s33: $stepnum("11")
cost-[hidden]r-s34
lambda2-r->s34: $stepnum("12")

'# データコンポーネント
lambda3<-r->neptune: $stepnum("7")
lambda3-[hidden]d-lambda4
lambda4<-r->opensearch: $stepnum("8")
neptune-[hidden]d-opensearch

'# 検出コンポーネント
ecs-d->fargate: $stepnum("15")
ecs-d->ecr
fargate-[hidden]r-ecr
fargate-l->apigateway2: $stepnum("17")
fargate-l->sdk: $stepnum("16")
fargate-l->config

'# イメージデプロイコンポーネント
codepipeline-u->s35
codepipeline-d->codebuild: $stepnum("13")
codebuild-d->container
container-d->ecr: $stepnum("14")

@enduml
```

分類子や制御、矢印の種類等、記載方法は以下
[https://plantuml.com/ja/sequence-diagram]


# 3. Detail
## 1. ログイン処理
-Data Access Definition  

| テーブル名 | C | R | U | D | 外部結合 | 結合条件 |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| customer | |*| | | | cstmr_code = request.cstmer_code  |
| user | |*| | | | cstmr_code = customer.cstmer_code {{br}} user_code = request.usr_code {{br}} password = request.pswd |

## 2. ログイン判定
| 値 | 判定条件 | 処理 |
| :--- | :--- | :---|
| 1.user | 存在する | 処理３へ |
| | 存在しない | 終了 |

## 3. ログイン履歴登録
-Data Access Definition  

| テーブル名 | C | R | U | D | 外部結合 | 結合条件 |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| customer | |*| | | | cstmr_code = request.cstmer_code  |
| user | |*| | | | cstmr_code = customer.cstmer_code {{br}} user_code = request.usr_code {{br}} password = request.pswd |
| history |*| | | | | cstmr_code = request.cstmer_code  |

## 4.DB Change Definition
| テーブル名 | 処理番号 | 
| :--- | :--- | 
| history | 3 |
| **カラム名** | **設定値** |
| cstmer_code | request.cstmer_code |
| user_code | request.usr_code |
| login_date_time | sysdate() |

## 5.Request Parameter
| パラメータ | 属性 | 必須 | データ型 | 最小値 | 最大値 | フォーマット補足 |
| :--- | :---: | :---: | :--- | ---: | ---: | :--- |
| cstmer_code | Path | * | String | 1 | 6 | | 
| usr_code | Post | * | String | 1 | 10 | |
| pswd | Post| * | String | 1 | 10 | [0-9][a-Z][-@?] |

## 6.Responce Parameter
-レスポンスコード:200

| パラメータ | 必須 | データ型 | 値 | 補足 |
| :--- | :---: | :--- | :--- | :--- |
| result | * | boolean | 2.result | true:認証成功<BR> false:認証失敗 |
| reason | | number | | result=false の場合のみセット<BR> 1:パスワード無効<BR> 2:パスワード間違い |

## 7.Others
