var OpsPulse = OpsPulse || {};

OpsPulse.Account = {
    onRevenueChange: function (executionContext) {
        let formContext = executionContext.getFormContext();

        let revenue = formContext.getAttribute("revenue");
        let description = formContext.getAttribute("description");
        if(revenue=== null || description === null) return;

        formContext.ui.clearFormNotification("revwarn");

        if(revenue.getValue()>100000){
            description.setRequiredLevel("required");
            formContext.ui.setFormNotification(
                "High revenue account - description is required.",
                "WARNING",
                "revwarn");
            
        }else{
            description.setRequiredLevel("none");
        }
    }
};