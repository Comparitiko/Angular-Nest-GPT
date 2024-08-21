import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu-item',
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="path()"
      routerLinkActive="bg-gray-800"
      class="flex justify-center items-center hover:bg-gray-800 rounded-md p-2 transition-colors"
    >
      <i class="{{ icon() }} text-2xl mr-4 text-indigo-400"></i>
      <div class="flex flex-col flex-grow">
        <span class="text-lg text-white font-semibold">{{ title() }}</span>
        <span class="text-gray-400 text-sm">{{ description() }}</span>
      </div>
    </a>
  `,
})
export class SidebarMenuItemComponent {
  public icon = input.required<string>();
  public title = input.required<string>();
  public description = input.required<string>();
  public path = input.required<string>();
}
