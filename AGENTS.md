# AGENTS.md

This file contains guidelines for agentic coding agents working on the lazy-email Angular 15 project.

## Project Overview

This is an Angular 15 application for automating repetitive emails using templates. The app uses:
- Angular 15 with TypeScript
- Tailwind CSS with DaisyUI for styling (dark theme)
- RxJS for reactive programming
- Google Gmail API integration
- Handlebars for template processing
- Karma + Jasmine for testing

## Build/Test Commands

### Development
```bash
# Start development server
ng serve
# or
npm start

# Build for development
ng build

# Build with file watching
ng build --watch --configuration development
```

### Production
```bash
# Build for production
ng build --configuration production --base-href .
# or
npm run build:prod
```

### Testing
```bash
# Run all tests
ng test
# or
npm test

# Run tests in watch mode
ng test --watch

# Run tests with coverage
ng test --code-coverage

# Run single test file
ng test --include="**/auth.service.spec.ts"
```

## Code Style Guidelines

### General Formatting
- Use 2 spaces for indentation (enforced by .editorconfig)
- Use single quotes for strings in TypeScript files
- Maximum line length: follow standard conventions
- Always include trailing newlines
- Trim trailing whitespace

### TypeScript/JavaScript
- Strict mode enabled (`strict: true`)
- No implicit any types
- Use explicit return types for methods when beneficial
- Prefer const over let when variable doesn't need reassignment
- Use arrow functions for callbacks and short functions

### Angular Specific
- Component selector prefix: `app-`
- Use SCSS for component styles
- Follow Angular naming conventions:
  - Components: PascalCase ending with `Component`
  - Services: PascalCase ending with `Service`
  - Models/Interfaces: PascalCase
  - Methods: camelCase
  - Properties: camelCase
- Use `providedIn: 'root'` for services
- Use protected for injected dependencies when accessed by child components

### Import Organization
- Group imports in this order:
  1. Angular core imports
  2. Third-party library imports
  3. Internal application imports (use relative paths)
- Use named imports when possible
- Sort imports alphabetically within groups

```typescript
// Correct example
import { Injectable, NgZone } from '@angular/core';
import { Observable, ReplaySubject, shareReplay } from 'rxjs';
import { User } from './user.model';
```

### RxJS Patterns
- Use pipe() with operators for observable transformations
- Prefer `shareReplay(1)` for caching observables
- Use `take(1)` for one-time subscriptions
- Handle observables with async pipe in templates when possible
- Use proper cleanup for subscriptions (ngOnDestroy)

### Component Structure
- Use separate files for template, styles, and logic
- Keep components focused on single responsibilities
- Use inputs/outputs for parent-child communication
- Prefer services for business logic

### Error Handling
- Use proper error handling in observables with catchError
- Validate user inputs
- Handle API errors gracefully
- Use try-catch blocks for synchronous operations
- Log errors appropriately for debugging

### CSS/SCSS Guidelines
- Use Tailwind utility classes primarily
- Use DaisyUI components for UI elements
- Dark theme is default
- Custom SCSS only when necessary for component-specific styles
- Follow mobile-first responsive design

### Testing Guidelines
- Test files should end with `.spec.ts`
- Use describe() and it() blocks for test organization
- Test both happy path and error cases
- Use TestBed for Angular testing
- Mock services appropriately
- Each component/service should have basic creation test

```typescript
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### File Structure Conventions
- Components: folder with component.ts, component.html, component.scss, component.spec.ts
- Services: service.ts and service.spec.ts in same directory
- Models: model.ts for interfaces/types
- Guards: guard.ts and guard.spec.ts
- Keep related files together in feature folders

### API Integration
- Use environment variables for configuration
- Handle Google API integration with proper OAuth flow
- Use NgZone for running code outside Angular zone
- Store tokens securely in localStorage with expiration

### Git Conventions
- Commit messages should be descriptive
- Ensure all tests pass before committing
- Check bundle sizes for production builds (budgets configured in angular.json)

## Environment Setup

1. Copy `src/environments/environment.example.ts` to `src/environments/environment.ts`
2. Configure Google Cloud Console credentials
3. Ensure node_modules are installed with `npm install`

## Performance Considerations

- Component budgets: initial < 500KB (warn), < 1MB (error)
- Individual component styles: < 2KB (warn), < 4KB (error)
- Use OnPush change detection when appropriate
- Lazy load modules where applicable
- Optimize bundle size for production

## Common Patterns

### Observable Pattern
```typescript
public data$ = this.source$.pipe(
  map(data => process(data)),
  shareReplay(1)
);
```

### Service Injection
```typescript
constructor(
  private authService: AuthService,
  protected sideBarService: SideBarService
) {}
```

### Component with Observable
```typescript
@Component({...})
export class ExampleComponent {
  data$: Observable<DataType> = this.service.data$;
  
  constructor(private service: ExampleService) {}
}
```