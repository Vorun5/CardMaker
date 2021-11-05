import React from 'react';


interface TemplateToolProps {

}

const TemplateTool: React.FC<TemplateToolProps> = (props) => {
    return (
        <div className="tools__template tools__item" {...props}>

        </div>
    );
};

export default TemplateTool;
