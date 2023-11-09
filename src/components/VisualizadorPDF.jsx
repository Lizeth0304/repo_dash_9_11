const VisualizadorPDF = ({ url }) => {
    return (
      <div className="w-full">
        
        <iframe
          title="VisualizadorPDF"
          style={{ width: "800px", height: "1100px" }}
          src={url}
        />
      </div>
    );
  };
  
export default VisualizadorPDF;