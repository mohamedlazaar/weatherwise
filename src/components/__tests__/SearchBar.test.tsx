import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { useWeatherStore } from '@/store/weather-store';

// Mock the weather store
jest.mock('@/store/weather-store', () => ({
  useWeatherStore: jest.fn(),
}));

const mockUseWeatherStore = useWeatherStore as jest.MockedFunction<typeof useWeatherStore>;

describe('SearchBar', () => {
  const mockFetchWeatherData = jest.fn();
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    mockUseWeatherStore.mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      loading: false,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      currentWeather: null,
      forecast: [],
      setCurrentWeather: jest.fn(),
      setForecast: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      clearWeatherData: jest.fn(),
    });
    jest.clearAllMocks();
  });

  it('should render search input and button', () => {
    render(<SearchBar />);
    
    expect(screen.getByPlaceholderText('Search for a city...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('should update input value when typing', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for a city...');
    
    fireEvent.change(input, { target: { value: 'New York' } });
    
    expect(input).toHaveValue('New York');
  });

  it('should call fetchWeatherData when form is submitted', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for a city...');
    const button = screen.getByRole('button', { name: 'Search' });
    
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockFetchWeatherData).toHaveBeenCalledWith('London');
    });
  });

  it('should not submit when input is empty', () => {
    render(<SearchBar />);
    const button = screen.getByRole('button', { name: 'Search' });
    
    fireEvent.click(button);
    
    expect(mockFetchWeatherData).not.toHaveBeenCalled();
  });

  it('should not submit when loading', () => {
    mockUseWeatherStore.mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      loading: true,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      currentWeather: null,
      forecast: [],
      setCurrentWeather: jest.fn(),
      setForecast: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      clearWeatherData: jest.fn(),
    });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for a city...');
    const button = screen.getByRole('button', { name: 'Searching...' });
    
    fireEvent.change(input, { target: { value: 'Paris' } });
    fireEvent.click(button);
    
    expect(mockFetchWeatherData).not.toHaveBeenCalled();
  });

  it('should show current search query when available', () => {
    mockUseWeatherStore.mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      loading: false,
      searchQuery: 'Tokyo',
      setSearchQuery: mockSetSearchQuery,
      currentWeather: null,
      forecast: [],
      setCurrentWeather: jest.fn(),
      setForecast: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      clearWeatherData: jest.fn(),
    });

    render(<SearchBar />);
    
    expect(screen.getByText('Showing weather for: Tokyo')).toBeInTheDocument();
  });

  it('should handle form submission with Enter key', async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for a city...');
    
    fireEvent.change(input, { target: { value: 'Berlin' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      expect(mockFetchWeatherData).toHaveBeenCalledWith('Berlin');
    });
  });

  it('should disable input and button when loading', () => {
    mockUseWeatherStore.mockReturnValue({
      fetchWeatherData: mockFetchWeatherData,
      loading: true,
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      currentWeather: null,
      forecast: [],
      setCurrentWeather: jest.fn(),
      setForecast: jest.fn(),
      setLoading: jest.fn(),
      setError: jest.fn(),
      clearWeatherData: jest.fn(),
    });

    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Search for a city...');
    const button = screen.getByRole('button', { name: 'Searching...' });
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
