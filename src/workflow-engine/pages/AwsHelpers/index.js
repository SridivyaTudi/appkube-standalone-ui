import React, {Component} from 'react';
import { configFun } from '../../config';
const AWS = require('aws-sdk');
const StepFunctions = require('aws-sdk/clients/stepfunctions');

class AwsHelper extends Component {
  config;
  credentials;
  dynamoDB;
  stepFunctions;
  lambda;
  constructor(props) {
    this.config = configFun(props.meta.jsonData.accessKey, props.meta.jsonData.secretKey, props.meta.jsonData.region);
    this.credentials = {
      region: this.config.REGION,
      accessKeyId: this.config.ACCESS_KEY_ID,
      secretAccessKey: this.config.SECRET_KEY,
    };
    this.dynamoDB = new AWS.DynamoDB(this.credentials);
    this.stepFunctions = new StepFunctions(this.credentials);
    this.lambda = new AWS.Lambda(this.credentials);
  }

  gettingMachineDef = (machineArn, onDone, onError) => {
    const params = {
      stateMachineArn: machineArn,
    };
    this.stepFunctions.describeStateMachine(params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        onError(err);
      } else {
        onDone(JSON.parse(data.definition).States);
      }
    });
  };
  // second table name =usecase_arn
  usecaseInputToDynamoDb(useCaseName, stepInput, onDone) {
    var paramsForDb = {
      TableName: 'usecase_input',
      Item: {
        usecaseName: { S: useCaseName },
        stepInput: { S: stepInput },
      },
    };

    this.dynamoDB.putItem(paramsForDb, function (err, data) {
      if (err) {
        console.error('Unable to write data: ', JSON.stringify(err, null, 2));
      } else {
        console.log('Put Input succeeded');
        onDone('Workflow Updated Successfully');
      }
    });
  }

  getUsecaseInputData(useCaseName, onDone, onError) {
    var pgParams = {
      FunctionName: 'stepFunction_with_psql_get_input' /* required */,
    };

    this.lambda.invoke(pgParams, function (err, data) {
      if (err) console.log(err, err.stack);
      else {
        // an error occurred
        onError(err);
        // console.log("Got usecase inputlist", data.Payload);

        JSON.parse(data.Payload).forEach((e) => {
          if (e.usecasename) {
            let usecase = {
              stepinput: e.stepinput,
              usecaseName: e.usecasename,
            };
            if (usecase.usecaseName == useCaseName) {
              onDone(usecase);
            }
          } else if (e.usecaseName) {
            onDone(e);
          }
          // if (e.usecasename === useCaseName) {
          //   onDone(e);
          //   // ;
          // }
          // });
        }); // successful response
      }
    });
  }

  // getUsecaseInputData(useCaseName, onDone, onError) {
  //   var params = {
  //     TableName: 'usecase_input',
  //   };
  //   this.dynamoDB.scan(params, function (err, data) {
  //     if (err) console.log(err, err.stack);
  //     else {
  //       // an error occurred
  //       console.log('Got usecase inputlist', data.Items);
  //       data.Items.forEach((e) => {
  //         if (e.usecaseName.S === useCaseName) {
  //           onDone(e);
  //         } else {
  //           onError(e.err);
  //         }
  //       });
  //     }
  //   });
  // }

  // getUsecaseList = (onDone, onError) => {
  //   var params = {
  //     TableName: 'usecase_input',
  //   };
  //   this.dynamoDB.scan(params, (err, data) => {
  //     console.log(data);
  //     if (err) {
  //       onError(err);
  //     } else {
  //       onDone(data.Items);
  //     }
  //   });
  // };

  getUsecaseList(onDone, onError) {
    var pgParams = {
      FunctionName: 'stepFunction_with_psql_get_input' /* required */,
    };

    this.lambda.invoke(pgParams, function (err, data) {
      if (err) {
        onError(err);
        console.log(err, err.stack);
      } else {
        // an error occurred
        onDone(JSON.parse(data.Payload));
      }
      // JSON.parse(data.Payload).forEach(e:any => {
      //     if (e.usecasename === useCaseName) {
      //         setStepInput(JSON.stringify(e.stepinput));
      //     }

      //         if (err) console.log(err, err.stack); // an error occurred
      //         else {
      //             console.log("Got usecase inputlist", data.Payload);
      // console.log(data)
      //             // JSON.parse(data.Payload).forEach(e:any => {
      //             //     if (e.usecasename === useCaseName) {
      //             //         setStepInput(JSON.stringify(e.stepinput));
      //             //     }

      //             // });

      //         };           // successful response
    });
  }

  //  getUsecaseList( onDone, onError) {

  //     var pgParams = {
  //         FunctionName: 'stepFunction_with_psql_get_usecase', /* required */
  //     };
  // console.log("get data ")
  //     this.lambda.invoke(pgParams, function (err:any, data:any) {
  //         if(err) {
  //           onError(err);
  //           console.log(err, err.stack);} // an error occurred
  //         else {
  //           console.log(data)
  //           onDone(JSON.parse(data));
  //             console.log("usecaselist", data.Payload)

  //         };           // successful response
  //     });

  // }

  updateUsecaseWholeData(usecaseData, onError, onDone) {
    console.log(usecaseData);
    let inputForpg = {
      stepInput: usecaseData,
      usecaseName: usecaseData.usecaseName,
    };

    var pgParams1 = {
      FunctionName: 'stepFunction_with_psql_usecase_whole_update' /* required */,
      Payload: JSON.stringify(inputForpg),
    };
    this.lambda.invoke(pgParams1, (err, data) => {
      if (err) {
        onError(err);
      } // an error occurred
      else {
        data.message = 'Update Usecase Success';
        onDone(data);
      } // successful response
    });
  }

  getExecutionHistory = (executionArn, onDone, onError) => {
    this.stepFunctions.getExecutionHistory({ executionArn }, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        onError(err);
      } else {
        const executedStateArray = [];
        data.events.forEach((e) => {
          if (e.type === 'TaskStateEntered' || e.type === 'PassStateEntered') {
            executedStateArray.push(e.stateEnteredEventDetails.name);
          }
        });
        onDone(executedStateArray);
      } // successful response
    });
  };

  executeStateMachine(executionData, onDone) {
    // delete params.usecaseName;
    const params = {
      stateMachineArn: executionData.stateMachineArn,
      input: '[]',
    };
    this.stepFunctions.startExecution(params, (err, data) => {
      if (err) {
        console.log(err);
        // const response = {
        // 	statusCode: 500,
        // 	body: JSON.stringify({
        // 		message: 'There was an error'
        // 	})
        // };
      } else {
        // usecaseArnToDynamoDb(data.executionArn);
        this.usecaseArnToDb(data.executionArn, executionData.usecaseName, () => {
          this.addJsonOnExecution(executionData.usecaseName, executionData.input, onDone);
        });
        // const response = {
        // 	statusCode: 200,
        // 	body: JSON.stringify({
        // 		message: 'Step function worked'
        // 	})
        // };
        // gettingExecutionHistory(data.executionArn);
      }
    });
  }
  usecaseArnToDb(executionArn, usecaseName, onDone) {
    let inputForpg = {
      executionArn: executionArn,
      usecaseName: usecaseName,
    };

    var pgParams = {
      FunctionName: 'stepFunction_with_psql' /* required */,
      Payload: JSON.stringify(inputForpg),
    };

    this.lambda.invoke(pgParams, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        // console.log('from pg', data); // successful response
        onDone();
      }
    });

    // var pgParams1 = {

    //     FunctionName: 'stepFunction_with_psql_usecase_input', /* required */
    //     Payload: JSON.stringify(inputForpg)

    // };

    // this.lambda.invoke(pgParams1, function (err:any, data:any) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else console.log("from pg sql", data);           // successful response
    // });
  }

  updateStageToDB(params, onError, onDone) {
    if (params.usecaseName == '') {
      console.log('Please, give an usecase name');
    } else {
      let inputForpg = {
        stepInput: params.stepinput,
        usecaseName: params.usecaseName,
      };
      var pgParams1 = {
        FunctionName: 'stepFunction_with_psql_usecase_input' /* required */,
        Payload: JSON.stringify(inputForpg),
      };
      this.lambda.invoke(pgParams1, function (err, data) {
        if (err) {
          onError(err);
          console.error(err, err.stack);
        }
        // an error occurred
        else {
          data.message = 'Update Usecase Stage Successful';
          onDone(data);
          // console.log('from pg', data)
        } // successful response
      });

      // getUsecaseInputData();
    }
  }

  addJsonOnExecution(usecaseName, stepInput, onDone) {
    let inputForpg = {
      stepInput: stepInput,
      usecaseName: usecaseName,
    };
    var pgParams1 = {
      FunctionName: 'stepFunction_with_psql_usecase_input' /* required */,
      Payload: JSON.stringify(inputForpg),
    };
    this.lambda.invoke(pgParams1, function (err, data) {
      let message = 'Workflow Created Successfully';
      if (err) {
        console.log(err, err.stack); // an error occurred
      } else {
        data.message = message;
        console.log('from pg', data); // successful response
        onDone(data);
      }
    });
  }

  // updateStageToDB(params, onError, onDone) {
  //   // let inputForpg = {
  //   //   stepInput: JSON.parse(singleStepInput),
  //   //   usecaseName: useCaseName
  //   // };
  //   var pgParams1 = {
  //     FunctionName: 'stepFunction_with_psql_usecase_input' /* required */,
  //     Payload: JSON.stringify(params),
  //   };

  //   this.lambda.invoke(pgParams1, function (err, data) {
  //     if (err) {
  //       console.log(err, err.stack); // an error occurred
  //       onError(err);
  //     } else {
  //       console.log(data);
  //       onDone && onDone(data);
  //     }
  //   });
  // }
}
export default AwsHelper;
