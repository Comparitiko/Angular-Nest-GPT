import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenuItemComponent } from '../../components/sidebar-menu-item/sidebar-menu-item.component';
import { routes } from '@app/app.routes';
import { RouteData } from '@app/interfaces/route-data.interface';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarMenuItemComponent],
  templateUrl: './dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  public routes: RouteData[] = this.setRouterData();

  private setRouterData(): RouteData[] {
    if (!routes[0].children) throw new Error('Inserta las rutas correctamente');

    const routesWithData = routes[0].children.filter((route) => route.data);

    const routesData = routesWithData.map((route) => {
      return {
        ...route.data,
        path: route.path,
      } as RouteData;
    });

    return routesData;
  }
}
