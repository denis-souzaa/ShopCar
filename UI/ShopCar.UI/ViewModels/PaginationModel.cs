namespace ShopCar.UI.ViewModels
{
    public class PaginationModel
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string Sort { get; set; } = string.Empty;
        public string SearchTerm { get; set; }
    }
}
