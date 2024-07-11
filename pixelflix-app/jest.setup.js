/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

// Make libraries available globally for all tests
global.React = React;
global.render = render;