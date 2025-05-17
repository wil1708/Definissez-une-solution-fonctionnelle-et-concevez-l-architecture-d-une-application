import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

// ✅ Import des modules Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter([]),
    importProvidersFrom(
      MatCardModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule
    )
  ]
};
