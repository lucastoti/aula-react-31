import React from "react";
import { createRoot } from 'react-dom/client'
import HomePage from './HomePage';

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('app')).render(<HomePage />);