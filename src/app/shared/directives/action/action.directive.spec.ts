import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent>;
  let component: ActionDirectiveTestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  })

  it('(D) (@Output appAction) should emit event with payload when ENTER key is pressed', () => {
    //const divElement: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const divElement: HTMLElement = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    const event = new KeyboardEvent('keyup', { key: "Enter" });
    divElement.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  it('(D) (@Output appAction) should emit event with payload when clicked', () => {
    //const divElement: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const divElement: HTMLElement = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    const event = new Event('click');
    divElement.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  it('(D) (@Output appAction) should emit event with payload when clicked or ENTER key is pressed', () => {
    //const divElement: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const divElement: HTMLElement = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement;
    const eventClick = new Event('click');
    const eventKeyboard = new KeyboardEvent('keyup', { key: "Enter" });
    divElement.dispatchEvent(eventClick);
    expect(component.hasEvent()).withContext('Click event').toBeTrue();
    component.resetForNewExpectation()
    divElement.dispatchEvent(eventKeyboard);
    expect(component.hasEvent()).withContext('Keyboard event "keyup Enter"').toBeTrue();

  });
});

@Component({
  template: `<div class='dummy-component' (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  private event: Event = null;

  public actionHandler(event: Event): void {
    this.event = event;
  }

  public hasEvent(): boolean {
    return !!this.event;
  }

  public resetForNewExpectation(): void {
    return this.event = null;
  }
}
