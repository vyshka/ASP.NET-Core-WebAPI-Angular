using System.Collections.Generic;

namespace ACWA.Web.Extensions
{
    public class PaginationHelper<T>
    {
        public IEnumerable<T> Entities { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
    }
}