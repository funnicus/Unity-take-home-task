import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import InfoTable from './InfoTable';
import { usersDiff } from '../lib/api/data';

describe('<InfoTable />', () => {
  let component
  
  let mockFetch = jest.fn();
  let mockChange = jest.fn();

  beforeEach(() => {

    component = render(
        <InfoTable 
          users={usersDiff}
          fetchData={mockFetch} 
          changeTable={mockChange} 
          loading={false} 
          error={false} 
          table={false}
        />
      );
  })

  test('renders info table and load button has text "Load more"', () => {
    const element = component.container.querySelector('.table');
    const btn = component.container.querySelector('.load-btn');
    expect(element).toBeDefined();
    expect(btn).toHaveTextContent("Load more");
  });

  test('error message exists, when error is set to true and load button has text "Retry"', () => {
    component = render(
        <InfoTable 
          users={usersDiff}
          fetchData={mockFetch} 
          changeTable={mockChange} 
          loading={false} 
          error={true} 
          table={false}
        />
      );

    const element = component.getByText('We had problems fetching your data. Please try again.');

    const btn = component.container.querySelector('.load-btn');
    expect(element).toBeDefined();
    expect(btn).toHaveTextContent("Retry");
  });

  test('shows spinner when loading is true', () => {

    component = render(
        <InfoTable 
          users={usersDiff}
          fetchData={mockFetch} 
          changeTable={mockChange} 
          loading={true} 
          error={false} 
          table={false}
        />
      );

    const element = component.container.querySelector('.progress');
    expect(element).toBeInTheDocument();
  });

  test('button press calls the correct handler', () => {

    const loadBtn = component.container.querySelector('.load-btn');
    const changeBtn = component.container.querySelector('.change-btn');

    fireEvent.click(loadBtn);
    fireEvent.click(changeBtn);

    expect(mockFetch.mock.calls).toHaveLength(1);
    expect(mockChange.mock.calls).toHaveLength(1);
  });
});