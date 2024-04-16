import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-register',
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [CardComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
