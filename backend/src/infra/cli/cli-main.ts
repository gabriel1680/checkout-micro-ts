import { CheckoutFactory } from "../../application/checkout/checkout-factory";
import { CLIController } from "./cli-controller";
import { CLIHandlerNode } from "./cli-handler-node";

const checkout = CheckoutFactory.createForProduction();
const cliHandler = new CLIHandlerNode();
new CLIController(cliHandler, checkout);
