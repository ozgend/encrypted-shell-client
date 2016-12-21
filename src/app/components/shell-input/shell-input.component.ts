import { Component, ElementRef, AfterViewChecked, ViewChild } from '@angular/core';
import { ShellExecutionService } from '../../services/shell-execution.service';
import { ShellCommand } from '../../models/shell-command';


@Component({
  selector: 'shell-input',
  templateUrl: './shell-input.component.html',
  styleUrls: ['./shell-input.component.css']
})
export class ShellInputComponent {
  @ViewChild('cli') private myScrollContainer: ElementRef;
  prompt: string;
  command: string;
  shellCommands: ShellCommand[];

  constructor(private shellExecutionService: ShellExecutionService) {
    this.shellCommands = new Array<ShellCommand>();

    var key =
      '-----BEGIN PUBLIC KEY-----' + '\n' +
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQro18x9v2Zkwjx2SFPb3qkDes' + '\n' +
      '2VEOU59+wsirY54iBT/neuAGlvxRtm5JdV0ByvE0OkJG1Au7aYBdgiFg3L98itIg' + '\n' +
      '7JOrve0CtYz4QxeruzmXLC2M4tmvRzwbPIp1yMpbXvrB0jAJo3CzHH/i6B/Rw0J8' + '\n' +
      '9l/kaSsykbMSZwyNGwIDAQAB' + '\n' +
      '-----END PUBLIC KEY-----' + '\n';

    this.shellExecutionService.setKey(key);
  }

  onKeyEvent(event: KeyboardEvent): void {
    if (event.keyCode == 13) {
      this.execute();
    }
  }

  execute(): void {
    if (!this.command) {
      return;
    }

    this.shellExecutionService
      .execute(this.command)
      .then(result => {
        this.shellCommands.push(result);
        this.prompt = result.cwd;
        this.command = '';
      })
      .then(function () {
        setTimeout(function () {
          window.scrollTo(0, document.body.scrollHeight);
        }, 10);
      });
  }

}
