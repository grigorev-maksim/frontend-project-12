import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => (
  <div className="h-100 position-absolute d-flex justify-content-center align-items-center">
    <BootstrapSpinner animation="border" variant="primary" />
  </div>
);

export default Spinner;
