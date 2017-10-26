using System;

namespace Platform
{
	class MainClass
	{
		public static void Main(string[] args)
		{

			if (args.Length > 0)
			{
				string command = args[0];

				switch (command.ToLower())
				{
					case "getuserenvironmentvariable":
						Console.WriteLine(getUserEnvironmentVariable(args[1]));
						break;
					case "setuserenvironmentvariable":
						if (args.Length > 2)
						{
							setUserEnvironmentVariable(args[1], args[2]);
						}
						else
						{
							setUserEnvironmentVariable(args[1], "");
						}
						break;
				}

			}

		}


		public static string getUserEnvironmentVariable(string key)
		{
			return Environment.GetEnvironmentVariable(key, EnvironmentVariableTarget.User);
		}

		public static void setUserEnvironmentVariable(string key, string value)
		{
			Environment.SetEnvironmentVariable(key, value, EnvironmentVariableTarget.User);
		}

		public static string getMachineEnvironmentVariable(string key)
		{
			return Environment.GetEnvironmentVariable(key,  EnvironmentVariableTarget.Machine);
		}

		public static void setMachineEnvironmentVariable(string key, string value)
		{
			// TODO requires administrator
		}

		public static string getProcessEnvironmentVariable(string key)
		{
			return Environment.GetEnvironmentVariable(key, EnvironmentVariableTarget.Process);
		}

		public static void setProcessEnvironmentVariable(string key, string value)
		{
			// TODO affect only this process
		}

	}

}
