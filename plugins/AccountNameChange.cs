using System;
using Microsoft.Xrm.Sdk;

namespace OpsPulsePlugins
{
    public class LogAccountRename: IPlugin
    {
        public void Execute (IServiceProvider serviceProvider)
        {
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));

            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));

            var service = factory.CreateOrganizationService(context.UserId);

            if (!context.InputParameters.Contains("Target")) return;
            if (!(context.InputParameters["Target"] is Entity target)) return;
            if (!context.PreEntityImages.Contains("PreImage")) return;

            var pre = context.PreEntityImages["PreImage"];
            var oldName = pre.GetAttributeValue<string>("name");
            var newName = target.GetAttributeValue<string>("name");

            if (string.IsNullOrEmpty(newName) || oldName == newName) return;

            tracing.Trace($"Rename {oldName} -> {newName}, depth {context.Depth}");

            try
            {
                var followUp = new Entity("task");
                followUp["subject"] = $"Renamed : {oldName} -> {newName}";

                followUp["regardingobjectid"] = new EntityReference("account", context.PrimaryEntityId);
                service.Create(followUp);
            }
            catch(Exception ex)
            {
                tracing.Trace($"Failed : {ex}");
                throw new InvalidPluginExecutionException("Could not log the rename.", ex);
            }
        }
    }
}