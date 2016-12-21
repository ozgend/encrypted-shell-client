import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Rx";
import { ShellCommand } from '../models/shell-command';
import { RequestModel } from '../models/request-model';
import 'rxjs/add/operator/toPromise';

var JsEncrypt = require('jsencrypt');


@Injectable()
export class ShellExecutionService {

  private _publicKey: string;

  constructor(private http: Http) { }

  setKey(key: string): void {
    this._publicKey = key;
  }

  createEncryptedRequestModel(body: any): RequestModel {
    var jsEncrypt = new JsEncrypt.JSEncrypt();
    jsEncrypt.setPublicKey(this._publicKey);
    var raw = JSON.stringify(body);
    var encrypted = jsEncrypt.encrypt(raw);
    var encryptedString = encrypted.toString();
    var requestModel = new RequestModel();
    requestModel.data = encryptedString;
    return requestModel;
  }


  execute(command: string): Promise<ShellCommand> {
    var shellCommand = new ShellCommand();
    shellCommand.command = command;

    var encryptedRequestModel = this.createEncryptedRequestModel(shellCommand);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var promise = this.http.post('http://localhost:5200/command', encryptedRequestModel,
      {
        headers: headers
      })
      .toPromise()
      .then(response => {
        return response.json() as ShellCommand;
      })
      .catch(err => {
        console.error(err);
      });

    return promise;
  }



}
