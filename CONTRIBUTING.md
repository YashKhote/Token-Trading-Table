# Contributing Guide

Thank you for your interest in contributing to the Token Trading Table project!

## Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd "Eterna Frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Code Style

### TypeScript
- Use strict mode TypeScript
- Define types for all props and state
- Use interfaces for object shapes
- Use types for unions and intersections

### React
- Use functional components with hooks
- Memoize expensive components with `memo()`
- Use `useMemo()` and `useCallback()` for optimization
- Follow React best practices

### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use responsive breakpoints consistently
- Maintain consistent spacing and colors

### File Organization
- Follow atomic design principles
- Group related components together
- Use clear, descriptive file names
- Export components from index files when appropriate

## Commit Guidelines

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```bash
git commit -m "feat: add token search functionality"
```

## Pull Request Process

1. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes

3. Test your changes:
```bash
npm run build
npm run lint
```

4. Commit your changes following commit guidelines

5. Push to your branch:
```bash
git push origin feature/your-feature-name
```

6. Create a Pull Request on GitHub

7. Ensure all checks pass:
   - Build succeeds
   - Linter passes
   - No TypeScript errors

## Component Development

### Creating New Components

1. Create component file in appropriate directory:
   - `components/ui/` for base UI components
   - `components/` for feature components

2. Export component:
```typescript
export const MyComponent = memo(function MyComponent(props) {
  // Component logic
});
```

3. Add TypeScript types:
```typescript
interface MyComponentProps {
  // Props definition
}
```

4. Add JSDoc comments for complex logic:
```typescript
/**
 * Component description
 * @param props - Component props
 */
```

## Testing

- Test responsive design on multiple screen sizes
- Test interactions (hover, click, keyboard)
- Test loading and error states
- Verify accessibility

## Performance

- Ensure components are memoized when appropriate
- Avoid unnecessary re-renders
- Optimize images and assets
- Keep bundle size small

## Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain proper focus management
- Test with screen readers

## Questions?

If you have questions, please open an issue on GitHub.

