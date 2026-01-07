import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
    it('renders correctly', () => {
        render(<Button title="Test Button" />);
        expect(screen.getByText('Test Button')).toBeTruthy();
    });
});
