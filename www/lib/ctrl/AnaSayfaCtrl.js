function AnaSayfaCtrl($scope,$window,db)
{
    function Init()
    {
        db.Connection(function(data)
        {
            let TmpQuery = 
            {
                query:  "SELECT * FROM KULLANICILAR"
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                console.log(Data)
            });
        });
    }
   
    $scope.Yeni = function()
    {
        Init();
    }
}