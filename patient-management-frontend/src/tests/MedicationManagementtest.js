import { render, screen, fireEvent } from '@testing-library/react';
import MedicationManagement from '../components/MedicationManagement';
import { authApi } from '../services/api';

jest.mock('../services/api');

describe('MedicationManagement', () => {
    beforeEach(() => {
        authApi.getPatientMedications.mockResolvedValue({
            data: [
                { id: 1, name: 'Aspirin', dosage: '100mg', frequency: 'daily' }
            ]
        });
    });
    
    test('renders medication list', async () => {
        render(<MedicationManagement />);
        expect(await screen.findByText('Aspirin')).toBeInTheDocument();
    });
    
    test('opens add medication modal', async () => {
        render(<MedicationManagement />);
        fireEvent.click(screen.getByText('Add Medication'));
        expect(screen.getByText('Add New Medication')).toBeInTheDocument();
    });
});