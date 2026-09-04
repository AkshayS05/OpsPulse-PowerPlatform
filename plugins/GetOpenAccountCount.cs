using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace OpsPulsePlugins
{
    public class GetOpenAccountCount : IPlugin
    {
       
        public void Execute(IServiceProvider sp)
        {
            var context = (IPluginExecutionContext)sp.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)sp.GetService(typeof(IOrganizationServiceFactory));

            
            var service = factory.CreateOrganizationService(context.UserId);

            var query = new QueryExpression("account")
            {
                ColumnSet = new ColumnSet(false)
            };
            query.Criteria.AddCondition("statecode", ConditionOperator.Equal, 0);

            var results = service.RetrieveMultiple(query);

            context.OutputParameters["Count"] = results.Entities.Count;
        }
    }
}