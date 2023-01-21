import { render } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';
import { Radio } from './Radio';

describe.concurrent('Components / Radio', () => {
  describe.concurrent('A11y', () => {
    it('should have role="radio" by default', () => {
      const radio = render(()=><Radio />).getByRole('radio');

      expect(radio).toBeInTheDocument();
    });
  });
});
