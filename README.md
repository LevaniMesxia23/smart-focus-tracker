# Smart Focus Tracker

[![npm version](https://badge.fury.io/js/smart-focus-tracker.svg)](https://badge.fury.io/js/smart-focus-tracker)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A production-ready React hook for comprehensive focus tracking and form analytics. Designed for UX teams, product managers, and developers who need precise user interaction insights.

## Overview

Smart Focus Tracker provides real-time monitoring of user focus patterns on form elements, enabling data-driven optimization of user experiences. Built with TypeScript and zero external dependencies, it seamlessly integrates into existing React applications.

## Key Features

- **Zero Dependencies**: Lightweight implementation with no external libraries
- **TypeScript Native**: Full type safety and IntelliSense support
- **Performance Optimized**: Minimal overhead with efficient event handling
- **Production Ready**: Thoroughly tested and enterprise-grade
- **Framework Agnostic**: Works with any React-based application
- **Real-time Analytics**: Millisecond-precision tracking

## Installation

```bash
npm install smart-focus-tracker
```

```bash
yarn add smart-focus-tracker
```

```bash
pnpm add smart-focus-tracker
```

## Quick Start

```typescript
import { useFocusTracker, FocusData } from "smart-focus-tracker";

export function ContactForm() {
  const { report } = useFocusTracker();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Generate analytics report before submission
    const focusAnalytics = report();

    // Send analytics to your backend
    await submitForm(formData, focusAnalytics);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="email" type="email" placeholder="Email address" />
      <input id="password" type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## API Documentation

### `useFocusTracker()`

The primary hook for focus tracking functionality.

**Returns:**

- `report(): Record<string, FocusData>` - Generates current focus analytics

### Type Definitions

```typescript
interface FocusData {
  focusTime: number; // Total focus duration in milliseconds
  focusCount: number; // Number of focus events
  lastFocused: number | null; // Timestamp of last focus event
}
```

### Usage Examples

#### Basic Implementation

```typescript
import { useFocusTracker } from "smart-focus-tracker";

function RegistrationForm() {
  const { report } = useFocusTracker();

  const analyzeUserBehavior = () => {
    const analytics = report();
    console.log("User focus patterns:", analytics);
  };

  return (
    <form>
      <input id="username" placeholder="Username" />
      <input id="email" placeholder="Email" />
      <button type="button" onClick={analyzeUserBehavior}>
        Analyze Behavior
      </button>
    </form>
  );
}
```

#### Advanced Analytics Integration

```typescript
import { useFocusTracker, FocusData } from "smart-focus-tracker";

function CheckoutForm() {
  const { report } = useFocusTracker();

  const trackFieldDifficulty = () => {
    const analytics = report();

    // Identify potentially problematic fields
    const problematicFields = Object.entries(analytics)
      .filter(([_, data]) => data.focusCount > 3 || data.focusTime > 10000)
      .map(([fieldId]) => fieldId);

    if (problematicFields.length > 0) {
      // Send UX insights to analytics service
      trackEvent("form_friction_detected", {
        fields: problematicFields,
        analytics,
      });
    }
  };

  return (
    <form onSubmit={trackFieldDifficulty}>
      <input id="cardNumber" placeholder="Card Number" />
      <input id="expiryDate" placeholder="MM/YY" />
      <input id="cvv" placeholder="CVV" />
    </form>
  );
}
```

## Implementation Requirements

- Elements must have unique `id` attributes for tracking
- Only focusable elements (inputs, textareas, selects, etc.) are monitored
- Compatible with React 16.8+ (hooks support required)

## Sample Analytics Output

```json
{
  "email": {
    "focusTime": 23.40,
    "focusCount": 1,
    "lastFocused": 2025-07-07 12:00:00
  },
  "password": {
    "focusTime": 0.93,
    "focusCount": 3,
    "lastFocused": 2025-03-07 12:31:59
  },
  "confirmPassword": {
    "focusTime": 8.92,
    "focusCount": 4,
    "lastFocused": null
  }
}
```

## Use Cases

### UX Research & Analytics

- Identify form friction points and abandonment patterns
- Measure field completion difficulty and user hesitation
- A/B testing of form layouts and field ordering

### Conversion Rate Optimization

- Optimize checkout flows based on user behavior data
- Reduce form abandonment through data-driven improvements
- Personalize user experiences based on interaction patterns

### Accessibility & Usability

- Monitor keyboard navigation patterns
- Identify accessibility pain points for screen reader users
- Validate form usability across different user segments


## Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/LevaniMesxia23/smart-focus-tracker/blob/main/CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/LevaniMesxia23/smart-focus-tracker.git
cd smart-focus-tracker
npm install
npm run build
npm test
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](https://github.com/LevaniMesxia23/smart-focus-tracker)
- 🐛 [Bug Reports](https://github.com/LevaniMesxia23/smart-focus-tracker/issues)
- 💡 [Feature Requests](https://github.com/LevaniMesxia23/smart-focus-tracker/issues)

---

**Made by [Levani Mesxia](https://github.com/LevaniMesxia23)**
