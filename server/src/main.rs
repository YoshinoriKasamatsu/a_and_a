use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder, Result};

use actix_files::Files;


// こう書くことで、`/`にGetのリクエストが来たときのハンドリングができる
#[post("/api/v1/hello")]
async fn greet() -> impl Responder {
    // ステータス200(OK)で、bodyに`Hello world!`を入れて返す
    let first_data: Vec<String> = vec!["hoge".to_owned(), "huga".to_owned(), "piyo".to_owned()];
    // リストから文字列へ変換
    let first_data_response = serde_json::to_string(&first_data).unwrap();
    // `ContentType: application/json`で返却
    HttpResponse::Ok()
        .content_type("application/json")
        .body(first_data_response)
}

// `#[get(...)]`を指定しないと使うときに指定するときもできる
async fn manual_greet() -> impl Responder {
    HttpResponse::Ok().body("Hey! Hey!! Hey!!!")
}

async fn index() -> Result<actix_files::NamedFile> {
    Ok(actix_files::NamedFile::open("./../angular-example/dist/angular-example/index.html")?)
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
        .route("/", web::get().to(index))
        // マクロでroutingを指定した関数はserviceに渡せばOK
        .service(greet)
        // routingを指定していない関数には、ここで指定することができる
        // ↓であれば、`/hey`にgetのリクエストが来たとき
        .route("/hey", web::get().to(manual_greet))
        .service(Files::new("/", "./../angular-example/dist/angular-example/").index_file("index.html"))
    })
    // ローカルホストのport8080で起動
    .bind("192.168.86.110:8080")?
    .run()
    .await
}