namespace ApiGateway
{
    using Microsoft.AspNetCore;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Ocelot.DependencyInjection;
    using Ocelot.Middleware;
    using Ocelot.Provider.Eureka;
    using Ocelot.Provider.Polly;
    using System.Text;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using Microsoft.AspNetCore.Authentication.JwtBearer;


    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseUrls("http://0.0.0.0:62586")
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                   
                    config
                        .SetBasePath(hostingContext.HostingEnvironment.ContentRootPath)
                        .AddJsonFile("appsettings.json", true, true)
                        .AddJsonFile($"appsettings.{hostingContext.HostingEnvironment.EnvironmentName}.json", true,
                            true)
                        //.AddJsonFile("OcelotConfigV1.json", false, false)
                        .AddJsonFile("OcelotConfigWithoutAuth.json", false, false)
                        .AddEnvironmentVariables();
                })
                .ConfigureServices(services =>
                {
                    //auth logic

                    string textKey = "SOMEAUTHKEY";

                    var key = Encoding.ASCII.GetBytes(textKey);

                    var signingKey = new SymmetricSecurityKey(key);
                    var tokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = signingKey,
                        ValidateIssuer = false,
                        ValidIssuer = "ankita",
                        ValidateAudience = false,
                        ValidAudience = "enduser",
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        RequireExpirationTime = true,
                        SaveSigninToken = true
                    };


                    services.AddAuthentication(x =>
                    {
                        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                      .AddJwtBearer("SOMEAUTHKEY", x =>
                      {

                          x.RequireHttpsMetadata = false;
                          x.TokenValidationParameters = tokenValidationParameters;
                      });

                    services.AddOcelot().AddEureka().AddPolly(); 
                })
                .Configure(a =>
                {
                    a.UseAuthentication();

                    a.UseOcelot().Wait();
                    a.UseDeveloperExceptionPage();
                })
                .Build();
        }
    }
}
