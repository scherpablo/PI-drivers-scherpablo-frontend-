import DetailComponent from "../components/Detail/Detail.component";
import { render, screen, expect, it } from "@testing-library/react";  
import { mockNavigate, cleanup } from 'vitest'

it('should render the correct DOM elements', () => {
  render(<DetailComponent />);

  const titleElement = screen.getByText('Driver Detail');
  expect(titleElement).toBeInTheDocument();

  const imageElement = screen.getByAltText('Imagen del Driver');
  expect(imageElement).toBeInTheDocument();

  const idElement = screen.getByText('ID:');
  expect(idElement).toBeInTheDocument();

  const nameElement = screen.getByText('Name:');
  expect(nameElement).toBeInTheDocument();

  const lastNameElement = screen.getByText('Last Name:');
  expect(lastNameElement).toBeInTheDocument();

  cleanup();
});

it('should navigate to the /create page when the edit button is clicked', () => {
  const navigateSpy = mockNavigate();

  render(<DetailComponent navigate={navigateSpy} />);

  const editButtonElement = screen.getByText('Editar Piloto');
  editButtonElement.click();

  expect(navigateSpy).toHaveBeenCalledWith('/create');

  cleanup();
});