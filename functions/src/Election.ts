const axios = require("axios");

const API_URL =
  "https://www.news24.com/Elections/Ajax/ElectionResultsData/GetLiveUpdate?language=en&year=2019&electionType=National";
// Replace with a valid web hook for your server
const WEB_HOOK_URL = "https://hooks.slack.com/services/T0XXXXXXX/BXXXXXXXX/XXXXXXXXXXXXXXXXXXX";

export class Election {
  static getResults() {
    return axios.get(API_URL);
  }

  static async parseResults(): Promise<Array<string>> {
    const rawData = await Election.getResults();
    const results: Array<Result> = rawData.data.Results;
    return results.map<string>(result => {
      return `${result.Key}: ${result.Value.Party1.Name} ${result.Value.Party1.Percentage}, ${
        result.Value.Party2.Name
      } ${result.Value.Party2.Percentage}`;
    });
  }

  static async postResults() {
    let message = "\n:flag-za: 2019 Latest Election Results :flag-za:```";
    const results = await Election.parseResults();
    results.forEach(result => (message += `\n${result}`));
    message += "```";
    await axios.post(WEB_HOOK_URL, { text: message });
  }
}

interface Result {
  Key: string;
  Value: ResultValue;
}

interface ResultValue {
  HasVotes: boolean;
  Party1: PartyResult;
  Party2: PartyResult;
}

interface PartyResult {
  Logo: string;
  Name: string;
  Percentage: string;
}
