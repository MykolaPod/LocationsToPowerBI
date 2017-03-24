using System.Web.Optimization;

namespace Prototype
{
    public  class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new StyleBundle("~/styles/common").Include(
                "~/Styles/common.css"));

            bundles.Add(new ScriptBundle("~/bundles/common").Include(
                    "~/Scripts/common.js",
                    "~/Scripts/jquery-3.1.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/prototype").Include(
                    "~/Scripts/address-autocomplete-controller.js"));
        }
    }
}