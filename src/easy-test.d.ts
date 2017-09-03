declare namespace jasmine {
  interface Matchers<T> {
    toContainText( text : string ) : boolean;
    toHaveClass( className : string ) : boolean;
    toHaveStyle( style : { [styleKey : string] : any } ) : boolean;
    // toHaveHtml( html : string ) : boolean;
    toBeDisabled() : boolean;
    toBeChecked() : boolean;
    toHaveValue( value : string ) : boolean;
    toBeInDOM() : boolean;
    toHaveAttr( { attr, val } ) : boolean;
  }
}