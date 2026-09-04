var OpsPulse = OpsPulse || {};

OpsPulse.Contact = {
    onContactEmailChange : function (executionContext){
        //get teh form context
        let formContext = executionContext.getFormContext();

        let email = formContext.getAttribute("emailaddress1");
        let preferredMethod  = formContext.getControl("preferredcontactmethodcode");

        if(email === null || preferredMethod === null){
            return;}
            formContext.ui.cleanFormNotification("noemail");
            var value = email.getValue();
            if(value === null || value ===""){

                preferredMethod.setDisabled(true);
                formContext.ui.setFormNotification(
                    "No Email address on file",
                    "INFO",
                    "noemail"
                );
                
            }else{
                preferredMethod.setDisabled(false);
            }
    }

};