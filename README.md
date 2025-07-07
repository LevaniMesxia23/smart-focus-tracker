# 🎯 Smart Focus Tracker

A lightweight React hook for tracking focus time and interactions on form elements. Perfect for UX analytics, form optimization, and understanding user behavior.

## ✨ Features

- 🚀 **Zero dependencies** (except React)
- 📊 **Real-time focus tracking** with millisecond precision
- 🎯 **Automatic element detection** based on element IDs
- 📈 **Comprehensive metrics**: focus time, focus count, and timestamps
- 🔧 **TypeScript support** with full type definitions
- ⚡ **Lightweight** and performant
- 🪝 **Simple React hook** interface

## 📦 Installation

```bash
npm install smart-focus-tracker
```

## 🚀 Quick Start

```tsx
import React, { useState } from "react";
import { useFocusTracker, FocusData } from "smart-focus-tracker";

function MyForm() {
  const { report } = useFocusTracker();
  const [focusReport, setFocusReport] = useState<Record<string, FocusData>>({});

  const handleGenerateReport = () => {
    const currentReport = report();
    setFocusReport(currentReport);
    console.log("Focus Report:", currentReport);
  };

  return (
    <form>
      <input id="firstName" placeholder="First Name" />
      <input id="email" placeholder="Email" />
      <textarea id="message" placeholder="Message" />

      <button type="button" onClick={handleGenerateReport}>
        Generate Focus Report
      </button>

      {Object.entries(focusReport).map(([elementId, data]) => (
        <div key={elementId}>
          <h3>#{elementId}</h3>
          <p>Focus Time: {data.focusTime}ms</p>
          <p>Focus Count: {data.focusCount}</p>
        </div>
      ))}
    </form>
  );
}
```

## 📖 API Reference

### `useFocusTracker()`

The main hook that provides focus tracking functionality.

**Returns:**

- `report()`: Function that returns the current focus tracking data

### `FocusData` Interface

```typescript
interface FocusData {
  focusTime: number;
  focusCount: number;
  lastFocused: number | null;
}
```

### `report()` Function

Returns a record of all tracked elements and their focus data.

**Returns:** `Record<string, FocusData>`

## 🔧 How It Works

1. **Automatic Detection**: The hook automatically detects all focusable elements with an `id` attribute
2. **Event Listening**: Uses `focusin` and `focusout` events to track focus changes
3. **Time Calculation**: Measures precise focus duration using `Date.now()`
4. **Data Aggregation**: Accumulates focus time and counts across multiple focus sessions

## ⚠️ Important Requirements

- **Elements must have an `id` attribute** to be tracked
- Only tracks elements that can receive focus (inputs, textareas, selects, etc.)
- Works with any HTML element that supports focus events

## 📊 Example Output

```javascript
{
  "firstName": {
    "focusTime": 3420,
    "focusCount": 2,
    "lastFocused": 1703123456789
  },
  "email": {
    "focusTime": 1250,
    "focusCount": 1,
    "lastFocused": null
  }
}
```

## 🎨 Examples & Demo

For a complete demo application and more examples, visit the [GitHub repository](https://github.com/LevaniMesxia23/smart-focus-tracker).

## 🔬 Testing

The package includes comprehensive tests to verify functionality. To test locally:

```bash
npm test
```

## 📋 Use Cases

- **Form Analytics**: Understand which fields users struggle with
- **UX Research**: Measure user engagement with different form elements
- **A/B Testing**: Compare focus patterns between different form designs
- **Accessibility**: Identify navigation patterns for keyboard users
- **Conversion Optimization**: Find friction points in forms

## 🤝 Contributing

Contributions are welcome! Please visit the [GitHub repository](https://github.com/LevaniMesxia23/smart-focus-tracker) to contribute.

## 📄 License

ISC License

## 🔗 Related

- [React Documentation](https://reactjs.org/)
- [Focus Events](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent)
- [Form Analytics Best Practices](https://www.nngroup.com/articles/form-analytics/)

---

Made by [Levani Mesxia](https://github.com/LevaniMesxia23)
