import React from 'react';
import CsvToXlsxConverter from './components/CsvToXlsxConverter';
import	MyNavbar from './components/MyNavbar'
import Footer from './components/MyFooter';

function App() {
  return (
    <div className="App">
      <MyNavbar/>
      <CsvToXlsxConverter />
      <Footer/>
    </div>
  );
}

export default App;
