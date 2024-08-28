import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedElementsComponent } from './advanced-elements/advanced-elements.component';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormElementSizesComponent } from './form-element-sizes/form-element-sizes.component';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { FormTreeviewComponent } from './form-treeview/form-treeview.component';
import { FormsWizardsComponent } from './forms-wizards/forms-wizards.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'form-elements',
        component: FormElementsComponent
      },
      {
        path: 'advanced-forms',
        component: AdvancedElementsComponent
      },
      {
        path: 'form-wizard',
        component: FormsWizardsComponent
      },
      {
        path: 'form-editor',
        component: FormEditorComponent
      },
      {
        path: 'form-element-sizes',
        component: FormElementSizesComponent
      },
      {
        path: 'form-treeview',
        component: FormTreeviewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
